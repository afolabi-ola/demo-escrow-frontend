export default function AdminEscrowStatusTable({
  status,
  paymentStatus,
  escrowfeepayment,
}: {
  status: string;
  paymentStatus: string;
  escrowfeepayment: string;
}) {
  return (
    <div className='w-full border border-db-border rounded-lg overflow-hidden bg-db-surface'>
      <table className='w-full border-collapse'>
        <thead className='bg-db-border'>
          <tr className='border-b border-db-border'>
            <th className='py-2 px-6 text-start text-db-text-primary font-light'>
              Status
            </th>
            <th className='py-2 px-6 text-start'></th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-b border-db-border'>
            <td className='py-2 px-6'>Escrow Status</td>
            <td className='py-2 px-6 capitalize'>{status}</td>
          </tr>
          <tr className='border-b border-db-border'>
            <td className='py-2 px-6'>Payment Status</td>
            <td className='py-2 px-6 capitalize'>{paymentStatus}</td>
          </tr>
          <tr className='border-b border-db-border'>
            <td className='py-2 px-6'>Escrow Fee Payment</td>
            <td className='py-2 px-6 capitalize'>{escrowfeepayment}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
