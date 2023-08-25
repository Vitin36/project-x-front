const { useState, createContext } = require("react");

const GlobalContext = createContext({});

export default function GlobalContextProvider({ children }) {
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [costCenters, setCostCerters] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [bankFlags, setBankFlags] = useState([]);
  const [permissions, setPermissions] = useState([
    {
      id: 1,
      name: "Ler Aplicações",
      description: "Usuário pode listar as aplicações",
    },
    {
      id: 2,
      name: "Criar Aplicações",
      description: "Usuário pode criar/editar/deletar aplicações",
    },
    {
      id: 3,
      name: "Ler Usuários",
      description: "Usuário pode listar usuários",
    },
    {
      id: 4,
      name: "Criar Usuários",
      description: "Usuário pode criar/editar/deletar usuários",
    },
    {
      id: 7,
      name: "Ler Contas Bancárias",
      description: "Usuário pode listar conta bancárias",
    },
    {
      id: 8,
      name: "Criar Contas Bancárias",
      description: "Usuário pode criar/editar/deletar conta bancárias",
    },
    {
      id: 9,
      name: "Ler Centros de Custo",
      description: "Usuário pode listar centros de custo",
    },
    {
      id: 10,
      name: "Criar Centros de custo",
      description: "Usuário pode criar/editar/deletar centros de custo",
    },
  ]);
  const [groupPermissions, setGroupPermissions] = useState([
    {
      id: 1,
      name: "Gráfico 1",
      description: "Esse grupo o cliente pode ver o gráfico 1",
    },
    {
      id: 2,
      name: "Gráfico 2",
      description: "Esse grupo o cliente pode ver o gráfico 2",
    },
    {
      id: 3,
      name: "Gráfico 3",
      description: "Esse grupo o cliente pode ver o gráfico 3",
    },
    {
      id: 4,
      name: "Gráfico 4",
      description: "Esse grupo o cliente pode ver o gráfico 4",
    },
    {
      id: 5,
      name: "Gráfico 5",
      description: "Esse grupo o cliente pode ver o gráfico 5",
    },
    {
      id: 6,
      name: "Editor Gráfico 1",
      description: "Esse grupo o cliente pode editar o gráfico 1",
    },
  ]);

  return (
    <GlobalContext.Provider
      value={{
        applications,
        setApplications,
        users,
        setUsers,
        groupPermissions,
        setGroupPermissions,
        permissions,
        setPermissions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const GlobalContextConsumer = GlobalContext;
