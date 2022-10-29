import * as React from 'react';

import { Badge, Button, Col, Container, Form, Row, Spinner, Table } from 'react-bootstrap';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import { Error } from '~/components/Error';
import { PathsEnum, ROUTES_PATHS } from '~/routes/constants';

import { IBlock } from './types';

const reg = /^\d+$/;

export const BlockViewer: React.FC = () => {
  const [block, setBlock] = React.useState<IBlock | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>('');

  const navigate = useNavigate();
  const { id } = useParams();

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (reg.test(e.target.value) || '' === e.target.value) {
      setValue(e.target.value);
    }
  };

  const onConfirmButtonClick = () => {
    navigate(generatePath(ROUTES_PATHS.blockById, { id: value }));
    setValue('');
  };

  const fetchBlock = (params: [string, boolean]) => {
    setLoading(true);
    fetch('https://cloudflare-eth.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getBlockByNumber',
        params,
        id: 1,
      }),
    }).then((response) => {
      if (!response.ok) {
        setError(response.statusText);
        setLoading(false);
      }
      return response.json();
    }).then((data) => {
      setBlock(data as IBlock);
      setLoading(false);
    }).catch((reason) => {
      setError(JSON.stringify(reason));
      setLoading(false);
    });
  };

  React.useEffect(() => {
    if (id && reg.test(id)) {
      fetchBlock([`0x${Number(id).toString(16)}`, true]);

    } else if (id && [PathsEnum.Latest, PathsEnum.Earliest, PathsEnum.Pending].includes(id as PathsEnum)) {
      fetchBlock([id, true]);
    } else {
      navigate(ROUTES_PATHS.latestBlock);
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form>
      <Container>
        <Row className='mb-4'>
          <Col lg={8}>
            <h2>{'Block viewer'}</h2>
          </Col>
          <Form.Label column={true} lg={1}>
            {'Go to:'}
          </Form.Label>
          <Col lg={2}>
            <Form.Control type='text' onChange={onInputChange} value={value} />
          </Col>
          <Col lg={1}>
            <Button disabled={!value} onClick={onConfirmButtonClick} type='submit' variant='primary'>
              {'Confirm'}
            </Button>
          </Col>
        </Row>
        {loading ? (
          <Row>
            <Col>
              <Spinner animation='border' role='status'>
                <span className='visually-hidden'>{'Loading..'}.</span>
              </Spinner>
            </Col>
          </Row>
        ) : error ? (
          <Row>
            <Col>
              <Error heading='Fetch error' message={error} />
            </Col>
          </Row>
        ) : !block?.result ? (
          <Row>
            <Col lg={12}>
              <Error heading='Response error' message='Result is null' />
            </Col>
          </Row>
        ) : (
          <>
            <Row className='mb-2'>
              <Col lg={2}>
                <h6>
                  {'Number'} <Badge bg='secondary'>{parseInt(block?.result.number.slice(2), 16)}</Badge>
                </h6>
              </Col>
              <Col lg={10}>
                <h6>
                  {'Hash'} <Badge bg='secondary'>{block?.result.hash}</Badge>
                </h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table striped={true} bordered={true} hover={true}>
                  <thead>
                  <tr>
                    <th>{'From'}</th>
                    <th>{'To'}</th>
                    <th>{'Transaction hash'}</th>
                  </tr>
                  </thead>
                  <tbody style={{ fontSize: '14px' }}>
                  {!block?.result.transactions.length
                    ? <tr><td colSpan={3}>{'Transactions not found'}</td></tr>
                    : block?.result.transactions.map((transaction) => (
                      <tr key={transaction.hash}>
                        <td>{transaction.from}</td>
                        <td>{transaction.to}</td>
                        <td>{transaction.hash}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </Form>
  );
};
