import { TransferContainer } from "@/components/transfer/TransferContainer";
import { getTransfers } from "../../../actions/transfer";

export default async function HomePage() {
    const transfers = await getTransfers({ page: 1, limit: 10 });
    return <TransferContainer transfersFetched={transfers} />
} 