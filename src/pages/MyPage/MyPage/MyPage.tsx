import Header from "@/components/MyPage/MyPage/Header/Header";
import MyProfile from "@/components/MyPage/MyPage/MyProfile/MyProfile";

function MyPage() {
  return (
    <div>
      <Header />
      <div className="pt-[6.7rem]">
        <MyProfile />
      </div>
    </div>
  );
}

export default MyPage;
