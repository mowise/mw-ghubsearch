import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import './style.css';

export default function App() {
  const [users, setUsers] = useState(null);
  const [total, setTotal] = useState('0');
  const [query, setQuery] = useState('example');
  const [perpage, setPerPage] = useState('12');
  const [page, setPage] = useState('1');

  const fetchData = async () => {
    const response = await axios.get(
      `https://api.github.com/search/users?q=${query}&per_page=${perpage}&page=${page}`
    );
    setUsers(response.data);
    setTotal(response.data.total_count);
    console.log(response.data.total_count);
    console.log(response.data);
  };

  const noResults = () => {
    return;
    <>No Results</>;
  };

  return (
    <>
      <div className="position-relative overflow-hidden p-3 p-md-5 bg-dark headerbg">
        <div className="col-7 p-lg-5 my-5">
          <h1 className="display-4 text-white fw-bold">
            <span className="text-primary">Search</span> more than{' '}
            <span className="text-primary">56M</span> Users on{' '}
            <span className="text-primary">GitHub</span>
          </h1>
          <div className="input-group mb-3 searchallusers">
            <input
              type="text"
              class="form-control"
              placeholder="Find A User"
              aria-label="Find A User"
              aria-describedby="button-usersearch"
              onChange={(event) => setQuery(event.target.value)}
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-usersearch"
              onClick={fetchData}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <Container className="py-5">
        <Row>
          <Col>
            <h6>{total} User Results</h6>
          </Col>
          <Col>
            <nav>
              <ul class="pagination pagination-sm justify-content-end">
                <li class="page-item disabled">
                  <a
                    class="page-link"
                    href="#"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    Previous
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
        <Row className="row-cols-4 g-4 mb-3">
          {users &&
            users.items.map((user, index) => {
              return (
                <Col>
                  <Card className="shadow rounded-0" key={index}>
                    <Card.Body>
                      <Row>
                        <Col xs={3}>
                          <a href={user.url} target="_blank">
                            <img
                              src={user.avatar_url}
                              className="img-fluid rounded-circle w-100"
                            />
                          </a>
                        </Col>
                        <Col>
                          <h5 className="card-title">
                            <a
                              href={user.url}
                              target="_blank"
                              className="fw-bold"
                            >
                              {user.login}
                            </a>
                          </h5>
                          <p className="card-text">
                            With supporting text below as a natural lead-in to
                            additional content.
                          </p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
        {!users && (
          <Row className="mb-3">
            <Col>
              <Card className="shadow rounded-0">
                <Card.Body>Currently No Results</Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        <Row>
          <Col></Col>
          <Col xs={3} sm={2} md={1} className="align-self-end">
            <select
              onChange={(event) => setPerPage(event.target.value)}
              class="form-select form-select-sm"
            >
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="48">48</option>
              <option value="96">96</option>
            </select>
          </Col>
        </Row>
      </Container>
    </>
  );
}
