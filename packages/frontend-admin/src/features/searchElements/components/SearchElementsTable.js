/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-mixed-operators */
import dayjs from 'dayjs';
import {Table, notification, Space, Tooltip, Tag} from 'antd';
import {useState,useEffect} from 'react';
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    DeleteOutlined,
    LoadingOutlined,
    PauseCircleOutlined,
    PlayCircleOutlined,
    ReloadOutlined
} from '@ant-design/icons';
import getQueries from '../api/getQueries';
import updateQuery from '../api/updateQuery';
import removeQuery from '../api/removeQuery';
import runQueryManually from '../api/runQueryManually';

const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Error!',
      description:
        'Error with execution action.',
    });
};

const SearchElementsTable = ({ numberOfRefresh }) => {
    const [waitingForFinish, setWaitingForFinish] = useState([]);
    const [dataSource, setDataSource ] = useState([]);

    const updatePendingQueries = (id, action) => {
        let updateArray = [...waitingForFinish];

        if (action === 'ADD') {
            updateArray.push(id);
        }

        if (action === 'REMOVE') {
            updateArray.filter(queryId => queryId !== id)
        }

        setWaitingForFinish(updateArray);
    }

    const runManually = async (id) => {
        try {
            updatePendingQueries(id, 'ADD');
            const response = await runQueryManually(id);

            if (response.ok) {
                updatePendingQueries(id, 'REMOVE');
                refreshList();
            }
        } catch(error) {
            console.error(error);
            openNotificationWithIcon('error');
            updatePendingQueries(id, 'REMOVE');
        }
    }

    const onStatusChangeClick = async (id, status) => {
        try {
            await updateQuery(id, { status });
            refreshList();
        } catch(error) {
            console.error(error);
            openNotificationWithIcon('error');
        }
    }

    const onRemoveClick = async (id) => {
        try {
            await removeQuery(id);
            refreshList();
        } catch(error) {
            console.error(error);
            openNotificationWithIcon('error');
        }
    }

    const refreshList = async () => {
        try {
            const response = await getQueries();
            setDataSource(response);
        } catch(error) {
            console.error(error);
            openNotificationWithIcon('error');
        }
    }

    useEffect(() => {
        refreshList();
    }, [numberOfRefresh]);

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
                {waitingForFinish.includes(record._id) && (
                    <Tooltip placement="top" title="Query working...">
                        <a onClick={() => {}}><LoadingOutlined /></a>
                    </Tooltip>
                )}
                {record.status === "RUNNING" && !waitingForFinish.includes(record._id) && (
                    <Tooltip placement="top" title="Run manually">
                        <a onClick={() => runManually(record._id)}><ReloadOutlined /></a>
                    </Tooltip>
                )}
                {record.status === "RUNNING" && (
                    <Tooltip placement="top" title="Pause checking">
                        <a onClick={() => onStatusChangeClick(record._id, 'STOPPED')}><PauseCircleOutlined /></a>
                    </Tooltip>
                )}
                {["STOPPED", "CREATED"].includes(record.status) && (
                    <Tooltip placement="top" title="Start checking">
                        <a onClick={() => onStatusChangeClick(record._id, 'RUNNING')}><PlayCircleOutlined /></a>
                    </Tooltip>
                )}
              </Space>
            ),
          },
    ]

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
