import { createContext } from "react";

export const SkillsContext = createContext({
    openEditSkillModal: () => { },
    openDeleteSkillModal: () => { },
    showEditSkillModal: false,
    handleCloseActionMenu: () => { },
    handleSubmit: () => { },
});