import { useState } from 'react';

const useModal = () => {
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    function toggle() {
        setVisible(!visible);
    }
    function toggle2() {
        setVisible2(!visible2);
    }
    return {toggle, visible2, visible,toggle2}
};

export default useModal;
