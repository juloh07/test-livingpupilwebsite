import { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  BadgeCheckIcon,
  LightningBoltIcon,
  UserIcon,
} from '@heroicons/react/solid';
import { UserType } from '@prisma/client';
import formatDistance from 'date-fns/formatDistance';
import Image from 'next/image';
import Link from 'next/link';

import Meta from '@/components/Meta';
import SideModal from '@/components/Modal/side-modal';
import { AdminLayout } from '@/layouts/index';
import Content from '@/components/Content';
import Card from '@/components/Card';
import { useUsers } from '@/hooks/data';

const Users = () => {
  const { data, isLoading } = useUsers();
  const [showModal, setModalVisibility] = useState(false);

  const toggleModal = () => setModalVisibility(!showModal);

  const myFunction = () => (console.log(data));

  myFunction();

  return (
    <AdminLayout>
      <Meta title="Living Pupil Homeschool - Users" />
      <SideModal show={showModal} toggle={toggleModal} />
      <Content.Title
        title="Users List"
        subtitle="View and manage all user details and related data"
      />
      <Card>
        <Card.Body title="List of Account Users" b>
          {/* <div>
            <Link href="/account/admin/users/users-export">
              <a className="items-center px-3 py-2 space-x-2 text-sm text-white rounded bg-primary-500 hover:bg-primary-600">
                Generate Users Master List
              </a>
            </Link>
          </div> */}
          <div>
            {/* <table className="w-full">
              <thead>
                <tr className="bg-gray-200 border-t border-b border-t-gray-300 border-b-gray-300">
                  <th className="p-2 font-medium text-left">Name</th>
                  <th className="p-2 font-medium text-center">Joined</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading ? (
                  data ? (
                    data.users.map((user, index) => (
                      <tr
                        key={index}
                        className="text-sm border-t border-b hover:bg-gray-100 border-b-gray-300"
                      >
                        <td className="flex p-2 space-x-3 text-left">
                          <div className="relative flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-300 rounded-full">
                            {user.image ? (
                              <Image
                                alt={user.name}
                                layout="fill"
                                loading="lazy"
                                objectFit="contain"
                                src={user.image}
                              />
                            ) : (
                              <UserIcon className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div>
                            <h4 className="flex items-center text-xl font-medium capitalize text-primary-500">
                              <span>{`${user.name || '-'}`}</span>
                              {user.userType === UserType.ADMIN && (
                                <span className="flex items-center justify-center w-4 h-4 ml-1 bg-red-600 rounded-full">
                                  <LightningBoltIcon className="w-3 h-3 text-white" />
                                </span>
                              )}
                              {user.emailVerified && (
                                <span className="ml-1">
                                  <BadgeCheckIcon className="w-5 h-5 text-green-600" />
                                </span>
                              )}
                            </h4>
                            <h5 className="flex items-center font-bold">
                              <span className="text-xs">{user.email}</span>
                            </h5>
                          </div>
                        </td>
                        <td className="p-2 space-x-3 text-xs text-center">
                          {user.createdAt
                            ? formatDistance(
                                new Date(user.createdAt),
                                new Date(),
                                {
                                  addSuffix: true,
                                }
                              )
                            : 'Invited'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2}>No records found...</td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td className="px-3 py-1 text-center" colSpan={2}>
                      Fetching records
                    </td>
                  </tr>
                )}
              </tbody>
            </table> */}
                  
  <DataGrid
  autoHeight
  rows={data ? data.users : []}
  columns={[
    
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center space-x-3 text-left p-1">
          <div className="relative flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-300 rounded-full">
            {params.row.image ? (
              <Image
                alt={params.row.name}
                layout="fill"
                loading="lazy"
                objectFit="contain"
                src={params.row.image}
              />
            ) : (
              <UserIcon className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <h4 className="flex items-center text-xl font-medium capitalize text-primary-500">
              <span>{`${params.row.name || '-'}`}</span>
              {params.row.userType === UserType.ADMIN && (
                <span className="flex items-center justify-center w-4 h-4 ml-1 bg-red-600 rounded-full">
                  <LightningBoltIcon className="w-3 h-3 text-white" />
                </span>
              )}
              {params.row.emailVerified && (
                <span className="ml-1">
                  <BadgeCheckIcon className="w-5 h-5 text-green-600" />
                </span>
              )}
            </h4>
            <h5 className="flex items-center font-bold">
              <span className="text-xs">{params.row.email}</span>
            </h5>
          </div>
        </div>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Joined',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <span className="text-xs text-center">
          {params.row.createdAt
            ? formatDistance(
                new Date(params.row.createdAt),
                new Date(),
                {
                  addSuffix: true,
                }
              )
            : 'Invited'}
        </span>
      ),
    },
  ]}
  loading={isLoading}
  pageSize={10}
  components={{ Toolbar: GridToolbar }}
  density="comfortable"
  disableSelectionOnClick
/>


          </div>
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default Users;
