import React from 'react';
import Modal from './modal';

const ConfirmationModal = ({ visible, onConfirm, onCancel, message }) => {
    return (
        <Modal visible={visible} toggle={onCancel}>
            <div className="p-4">
                <p className="text-lg font-bold mb-4">{message}</p>
                <div className="flex justify-end">
                    <button onClick={onCancel} className="mr-2 upload-bill-close-btn">Nein</button>
                    <button onClick={onConfirm} className="upload-bill-submit-btn">Ja</button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
