/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-mixed-operators */
import dayjs from 'dayjs';
import {Table, Space, Tooltip, Tag} from 'antd';
import {useState,useEffect} from 'react';
import {ArrowUpOutlined, ArrowDownOutlined, PauseCircleOutlined, PlayCircleOutlined, DeleteOutlined} from '@ant-design/icons';
import getQueries from '../api/getQueries';
import updateQuery from '../api/updateQuery';
import removeQuery from '../api/removeQuery';

const SearchElementsTable = ({numberOfRefresh}) => {
    const [dataSource, setDataSource ] = useState([]);

    const onRemoveClick = async (id) => {
        try {
            await removeQuery(id);
            refreshList();
        } catch(error) {
            console.error(error);
        }
    }

    const onStatusClick = async (id, status) => {
        try {
            await updateQuery(id, {
                status
            });
            refreshList();
        } catch(error) {
            console.error(error);
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            ellipsis: true,
            render: text => <a href={text} target="_blank" rel="noreferrer">{text}</a>
        },
        {
            title: 'Cron',
            dataIndex: 'cron',
            key: 'cron',
            width: 100,
            render: text => <Tag>{text}</Tag>
        },
        {
            title: 'Selector',
            dataIndex: 'selector',
            key: 'selector',
            ellipsis: true,
            render: text => <Tag>{text}</Tag>
        },
        {
            title: 'Last result',
            dataIndex: 'lastResult',
            key: 'lastResult',
            ellipsis: true,
            width: 110,
            render: (lastResult, record) => {
                const { values } = record;

                if (record.isError) {
                    return <Tag color="red">ERROR</Tag>
                }

                if (values && Array.isArray(values) && values.length >= 2) {
                    if (parseFloat(lastResult) > parseFloat(values[values.length - 2].value)) {
                        return <span>{lastResult} <ArrowUpOutlined /></span>
                    } else {
                        return <span>{lastResult} <ArrowDownOutlined /></span>
                    }
                }

                return <span>{lastResult}</span>
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ellipsis: true,
            width: 115,
            render: status => {
                if (status === "RUNNING") {
                    return <Tag color="green">{status}</Tag>
                }
                if (status === "CREATED") {
                    return <Tag color="yellow">{status}</Tag>
                }
                if (status === "STOPPED") {
                    return <Tag color="red">{status}</Tag>
                }
                return <Tag>{status}</Tag>
            }
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (text, record) => (
              <Space size="small">
                <Tooltip placement="top" title="Remove">
                    <a onClick={() => onRemoveClick(record._id)}><DeleteOutlined /></a>
                </Tooltip>
                {/* <Tooltip placement="top" title="Edit">
                    <a><EditOutlined /></a>
                </Tooltip> */}
                {record.status === "RUNNING" && (
                    <Tooltip placement="top" title="Pause checking">
                        <a onClick={() => onStatusClick(record._id, 'STOPPED')}><PauseCircleOutlined /></a>
                    </Tooltip>
                )}
                {["STOPPED", "CREATED"].includes(record.status) && (
                    <Tooltip placement="top" title="Start checking">
                        <a onClick={() => onStatusClick(record._id, 'RUNNING')}><PlayCircleOutlined /></a>
                    </Tooltip>
                )}
              </Space>
            ),
          },
    ]

    const refreshList = () => {
        getQueries().then(response => {
            setDataSource(response);
        })
    }

    useEffect(() => {
        refreshList();
    }, [numberOfRefresh]);

    return (
        <Table
            bordered
            dataSource={dataSource}
            columns={columns}
            rowKey={record => record._id}
            pagination={false}
            expandable={{
                expandedRowRender: record => (
                    <div>
                        {record.description && <p>Description: {record.description}</p>}
                        <Table
                            bordered
                            columns={[
                                {title: 'Date', dataIndex: 'date', key: 'date', width: 300, render: (date) => (
                                    <span>{dayjs(new Date(date)).format('YYYY-MM-DD HH:mm')}</span>
                                )},
                                {title: 'Results', dataIndex: 'value', key: 'value'}
                            ]}
                            rowKey={record => record.date}
                            dataSource={record.values && [...record.values].reverse()}
                            size="small"
                        />
                    </div>
                ),
                rowExpandable: record => record.description || record.values && record.values.length,
            }}
        />
    )
}

export default SearchElementsTable;
