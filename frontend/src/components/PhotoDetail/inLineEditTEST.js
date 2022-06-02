import { useState } from 'react';

const InlineEdit = ({ value, setValue }) => {
    const [editingValue, setEditingValue] = useState(value);

    const onChange = (event) => setEditingValue(event.target.value);

    const onKeyDown = (event) => {
        if (event.key === "Enter" || event.key === "Escape") {
            event.target.blur();
        }
    }

    const onBlur = (event) => {
        if (event.target.value.trim() === "") {
            setEditingValue(value);
        } else {
            setValue(event.target.value)
        }
    }


    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const userId = sessionUser.id;

    //     const newlyEditedComment = {
    //         id: editingComment.id,
    //         userId,
    //         comment
    //     }
    //     dispatch(editComment(newlyEditedComment))

    //         .catch(async (res) => {
    //             const data = await res.json();
    //             if (data && data.errors) setErrors(data.errors)
    //         });
    // }

    return (
        <input
            type="text"
            aria-label="Field name"
            value={ editingValue }
            onChange={ onChange }
            onKeyDown={ onKeyDown }
            onBlur={ onBlur }
            placeholder='edit comment here'
        />
    );
};

// const App = () => {
//     const [value, setValue] = useState();

//     return <InlineEdit value={ value } setValue={ setValue } />;
// };

export default InlineEdit;
