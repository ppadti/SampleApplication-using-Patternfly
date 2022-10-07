import { Pagination } from '@patternfly/react-core'
import React, { useEffect, useState } from 'react'
import {
  TableComposable,
  Caption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table'
import axios from 'axios'

interface Data {
  name: string
  username: number
  email: number
  address: {
    city: string
  }

  phone: string
}

const UserDetails = () => {
  const [page, setPage] = React.useState(1)
  const [perPage, setPerPage] = React.useState(20)
  const [data, setData] = useState<Data[]>([])
  const [error, setError] = useState(null)

  const onSetPage = (
    _event: React.MouseEvent | React.KeyboardEvent | MouseEvent,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const onPerPageSelect = (
    _event: React.MouseEvent | React.KeyboardEvent | MouseEvent,
    newPerPage: number,
    newPage: number,
  ) => {
    setPerPage(newPerPage)
    setPage(newPage)
  }

  const columnNames = {
    name: 'Name',
    username: 'User Name',
    email: 'Email',
    city: 'City',
    phone: 'Phone Number',
  }

  useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setData(response.data)
      })

      .catch((error) => {
        console.error('Error in loading data', error)
        setError(error)
      })
  }, [])
  console.log(data[0])

  return (
    <>
      {!error && (
        <>
          {' '}
          <Pagination
            perPageComponent="button"
            itemCount={10}
            perPage={perPage}
            page={page}
            onSetPage={onSetPage}
            widgetId="pagination-options-menu-top"
            onPerPageSelect={onPerPageSelect}
          />
          <TableComposable aria-label="Simple table" isStriped>
            <Caption>
              <b>User Details</b>
            </Caption>

            <Thead>
              <Tr>
                <Th>{columnNames.name}</Th>
                <Th>{columnNames.username}</Th>
                <Th>{columnNames.email}</Th>
                <Th>{columnNames.city}</Th>
                <Th>{columnNames.phone}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((user) => (
                <Tr key={user.phone}>
                  <Td dataLabel={columnNames.name}>{user['name']}</Td>
                  <Td dataLabel={columnNames.username}>{user['username']}</Td>
                  <Td dataLabel={columnNames.email}>{user['email']}</Td>
                  <Td dataLabel={columnNames.city}>
                    {user['address']['city']}
                  </Td>
                  <Td dataLabel={columnNames.phone}>{user['phone']}</Td>
                </Tr>
              ))}
            </Tbody>
          </TableComposable>
        </>
      )}
    </>
  )
}

export default UserDetails
