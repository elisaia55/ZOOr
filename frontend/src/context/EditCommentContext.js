import { createContext, useContext, useState } from 'react';

export const EditCommentContext = createContext();

export const useEditCommentContext = () => useContext(EditCommentContext);

export default function EditTrackProvider({ children }) {
    const [openEdit, setOpenEdit] = useState(false);
    const [saveChanges, setSaveChanges] = useState(false);

    return (
        <EditCommentContext.Provider value={ { openEdit, setOpenEdit, saveChanges, setSaveChanges } }>
            { children }
        </EditCommentContext.Provider>
    );
}
