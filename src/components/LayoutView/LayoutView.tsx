import "./LayoutView.style.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { dashboardElements } from "./LayoutView.constants";
import { TableWorks } from "../TableWorks";

export function LayoutView() {
  return (
    <div className="layout-menu">
      <div className="dashboard">
        <div className="name-project layout-menu-row">
          <div className="name-project-title">Название проекта</div>
          <div className="name-project-abr">Аббревиатура</div>
        </div>

        <div className="dashboard-elements">
          {dashboardElements.map((el) => (
            <div
              key={el.id}
              className={`dashboard-el ${el.id === 5 ? "dashboard-el-active" : ""}`}
            >
              <DashboardIcon />
              <span>{el.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <div className="layout-menu-row open-elements">
          <div>Строительно-монтажные работы</div>
        </div>

        <TableWorks />
      </div>
    </div>
  );
}
