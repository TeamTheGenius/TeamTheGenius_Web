import { useGetTotalCertifications } from "@/hooks/queries/useCertificationQuery";
import TotalCertification from "../../TotalCertification/TotalCertification";

interface Props {
  decryptedInstanceId: number;
  decryptedUserId: number;
}
function MyTotalCertification({ decryptedInstanceId, decryptedUserId }: Props) {
  const { data: certifications } = useGetTotalCertifications({
    decryptedInstanceId,
    decryptedUserId,
  });
  if (!certifications) return;
  return (
    <div className="mt-[9.2rem] _sm:mt-[4.8rem]">
      <div className="flex justify-center items-center w-full">
        <div className="w-full max-w-[54rem] grid grid-cols-7 _sm:grid-cols-5 _md:grid-cols-6 gap-x-[2rem] gap-y-[5rem] ">
          <TotalCertification data={certifications} />
        </div>
      </div>
    </div>
  );
}

export default MyTotalCertification;
