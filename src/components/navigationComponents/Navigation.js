import React, { useEffect, useState } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navigation() {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchResources();
    // クリックイベントリスナーを追加
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleResourceChange = () => {
      fetchResources();
    };

    // イベントリスナーを追加
    window.addEventListener("resourceAdded", handleResourceChange);
    window.addEventListener("resourceDeleted", handleResourceChange);
    window.addEventListener("resourceUpdated", handleResourceChange);
    // コンポーネントのクリーンアップ時にイベントリスナーを削除
    return () => {
      window.removeEventListener("resourceAdded", handleResourceChange);
      window.removeEventListener("resourceDeleted", handleResourceChange);
      window.removeEventListener("resourceUpdated", handleResourceChange);
    };
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/resources");
      setResources(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const handleOutsideClick = (event) => {
    console.log("Outside click detected");
    if (!event.target.closest(".mysidenav")) {
      console.log("Closing sidebar");
      setExpanded(false);
    }
  };

  return (
    <SideNav
      onSelect={(selected) => {
        navigate(selected);
      }}
      onToggle={(expanded) => {
        setExpanded(expanded);
      }}
      expanded={expanded}
      className="mysidenav"
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="/">
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: "24px" }} />
          </NavIcon>
          <NavText>予約表一覧</NavText>
          {resources.map((resource) => (
            <NavItem
              key={resource.resourceId}
              eventKey={`/reservation/${resource.resourceId}`}
            >
              <NavText>{resource.resourceName}</NavText>
            </NavItem>
          ))}
        </NavItem>
        <NavItem eventKey="settings">
          <NavIcon>
            <i className="fa fa-fw fa-cog" style={{ fontSize: "24px" }} />
          </NavIcon>
          <NavText>設定</NavText>
          <NavItem eventKey="settings/login">
            <NavText>ログイン</NavText>
          </NavItem>
          <NavItem eventKey="settings/add-reservation-table">
            <NavText>新規予約表追加</NavText>
          </NavItem>
          <NavItem eventKey="settings/delete-resource">
            <NavText>予約表削除</NavText>
          </NavItem>
          <NavItem eventKey="settings/update-resource">
            <NavText>予約表の名前変更</NavText>
          </NavItem>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}

export default Navigation;
