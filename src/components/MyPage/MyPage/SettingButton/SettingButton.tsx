import settigIcon from "@/assets/icon/setting-icon.svg";
import { PATH } from "@/constants/path";
import { Link } from "react-router-dom";

function SettingButton() {
  return (
    <Link
      to={PATH.MY_PAGE_SETTING_MENU}
      className="shrink-0 w-[6.3rem] h-[4.8rem] rounded-[2.4rem] border border-[#C8C8C8] flex justify-center items-center"
    >
      <img src={settigIcon} alt="설정 아이콘" />
    </Link>
  );
}

export default SettingButton;
