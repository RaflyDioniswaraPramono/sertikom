import { MailOutlined, ReadOutlined, UserOutlined } from "@ant-design/icons";

export const sidebarContents = [
  {
    id: 1,
    to: "/surat",
    linkName: "Arsip Surat",
    icon: <MailOutlined style={{fontSize: "1.2rem"}}/>,
  },
  {
    id: 2,
    to: "/kategori",
    linkName: "Kategori Surat",
    icon: <ReadOutlined />,
  },
  {
    id: 3,
    to: "/about",
    linkName: "Tentang",
    icon: <UserOutlined />,
  },
];
