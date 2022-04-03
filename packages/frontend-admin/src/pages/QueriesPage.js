import {useState} from 'react';
import {Form, Button, Row, Input, Modal, Col, Select, Space} from 'antd'
import SearchElementsTable from 'features/searchElements';
import createQuery from 'features/searchElements/api/createQuery';
// import restartWebScrapingServer from 'features/searchElements/api/restartWebScrapingServer';

const { Option } = Select;

const QueriesPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [numberOfRefresh, setNumberOfRefresh] = useState(0);

    const showModal = () => {
        setIsModalVisible(true);
      };

      const handleOk = () => {
        form.submit();
      };

      const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
      };

    // const runAllQueries = () => {
    //     // TODO: fix restart app
    //     console.log('runAllQueries');
    //     restartWebScrapingServer();
    // }

      const onFinish = async (values) => {
          try {
              await createQuery(values);
              setNumberOfRefresh(numberOfRefresh + 1);
              handleCancel();
          }
          catch (error) {
              console.error(error);
          };
      }

    return (
        <div>
            <Row justify="end" style={{marginBottom: "16px"}}>
                <Col>
                <Space>
                    {/* <Button danger onClick={runAllQueries}>Run all manually</Button> */}
                    <Button type="primary" onClick={showModal}>Add new query</Button>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col>
                    <SearchElementsTable numberOfRefresh={numberOfRefresh} />
                </Col>
            </Row>
            <Modal title="Add new query" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="control-hooks"
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        status: 'RUNNING',
                        cron: '*/5 * * * *',
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        style={{ marginBottom: '10px' }}
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="url"
                        label="URL"
                        style={{ marginBottom: '10px' }}
                        rules={[{ required: true, message: 'Please input your url!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="selector"
                        label="Element HTML selector"
                        style={{ marginBottom: '10px' }}
                        rules={[{ required: true, message: 'Please input your selector!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="status" label="Status" style={{ marginBottom: '10px' }} rules={[{ required: true }]}>
                        <Select>
                            <Option value="RUNNING">RUNNING</Option>
                            <Option value="CREATED">CREATED</Option>
                            <Option value="STOPPED">STOPPED</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="cron"
                        label="CRON"
                        style={{ marginBottom: '10px' }}
                        rules={[{ required: true, message: 'Please input your selector!' }]}
                    >
                        <Input placeholder="*/5 * * * *" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        style={{ marginBottom: '10px' }}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )

}

export default QueriesPage;
