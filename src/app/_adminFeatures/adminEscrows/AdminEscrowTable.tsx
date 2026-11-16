import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import Button from '@/app/_components/Button';
import DataTable from '@/app/_components/DataTable';
import { AdminEscrowItem } from '@/app/_types/dashboardServicesTypes';

const columnHelper = createColumnHelper<AdminEscrowItem>();

export default function AdminEscrowTable({ escrowData }: { escrowData: AdminEscrowItem[] }) {
  const { push } = useRouter();

  const columns: ColumnDef<AdminEscrowItem>[] = useMemo(() => {
    /*base columns*/
    const base: ColumnDef<AdminEscrowItem>[] = [
      {
        header: 'Category',
        accessorKey: 'category',
      },
      {
        header: 'Description',
        accessorKey: 'description',
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
      },
      {
        header: 'Status',
        accessorKey: 'status',
      },
      {
        header: 'Payment Status',
        accessorKey: 'paymentStatus',
      },
      {
        header: 'Date',
        accessorKey: 'createdAt',
      },
    ];

    /*actions column*/
    const actions = columnHelper.display({
      id: 'actions',
      header: '',
      cell: (row) => (
        <Button
          type='button'
          color='bg-db-secondary text-db-surface'
          onClick={() => push(`escrows/${row.row.original._id}`)}
        >
          View Details
        </Button>
      ),
    });

    return [...base, actions];
  }, [push]);

  return <DataTable<AdminEscrowItem> data={escrowData} columns={columns} />;
}
