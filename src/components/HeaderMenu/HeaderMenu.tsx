import "./HeaderMenu.style.scss";
import AppsIcon from "@mui/icons-material/Apps";
import ReplyIcon from "@mui/icons-material/Reply";

export function HeaderMenu() {
  return (
    <div className="header_menu">
      <div className="header_menu-icons">
        <AppsIcon className="cursor_pointer" />
        <ReplyIcon className="cursor_pointer" />
      </div>
      <div className="header_menu-nav">
        <div className="element_active">Просмотр</div>
        <div>Управление</div>
      </div>
    </div>
  );
}
