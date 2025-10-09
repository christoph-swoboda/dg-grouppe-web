
import React, {useEffect, useState} from 'react';
import {useStateValue} from "../../states/StateProvider";
import Api from "../../api/api";
import {toast} from "react-toastify";
import '../../style/uploadBill.scss'

const UploadBill = ({user, userTypes, toggle, fetchData}) => {

    const [loading, setLoading] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [period, setPeriod] = useState('1');
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear.toString());
    const years = Array.from({length: 6}, (_, i) => currentYear + i);

    useEffect(() => {
        if (user) {
            setSelectedTypes([]);
        }
    }, [user]);

    const handleCheckboxChange = (typeId) => {
        setSelectedTypes(prevSelectedTypes => {
            if (prevSelectedTypes.includes(typeId)) {
                return prevSelectedTypes.filter(id => id !== typeId);
            } else {
                return [...prevSelectedTypes, typeId];
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const confirmation = window.confirm("Wenn dies einmal erstellt wurde, kann es nicht mehr rückgängig gemacht werden. Einverstanden zum Fortfahren?");

        if (!confirmation) {
            return;
        }

        setLoading(true);

        Api().post('/create-bills-for-user', {
            user_id: user.id,
            types: selectedTypes,
            period: period,
            year: year
        })
            .then((response) => {
                toast.success(response.data.message || 'Rechnungen erfolgreich erstellt');
                fetchData();
                toggle();
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || 'Ein Fehler ist aufgetreten');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className={'uploadBillForm'}>
                <h2 className="text-lg font-bold mb-4" style={{textAlign:'center'}}>Rechnung hochladen</h2>
                <br/>
                <br/>
                <div className="mb-4">
                    <label htmlFor="period" className="block text-sm text-bold font-medium text-gray-700">Zeitraum</label>
                    <select
                        id="period"
                        value={period}
                        onChange={e => setPeriod(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="year" className="block text-sm text-bold font-medium text-gray-700">Jahr</label>
                    <select
                        id="year"
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        {years.map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm text-bold text-gray-700 mb-2">Rechnungsarten</label>
                    <div className="flex flex-wrap gap-4">
                        {userTypes?.map(type => (
                            <div key={type.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`type-${type.id}`}
                                    checked={selectedTypes.includes(type.id)}
                                    onChange={() => handleCheckboxChange(type.id)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor={`type-${type.id}`} className="ml-2 block text-sm text-gray-900">
                                    {type.title}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{display:'flex'}}>
                    <button onClick={toggle} className="upload-bill-close-btn">Abbrechen</button>

                    <button
                        type="submit"
                        disabled={loading || selectedTypes.length === 0}
                        className={'upload-bill-submit-btn'}
                    >
                        {loading ? 'Wird erstellt...' : 'Anfrage erstellen'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UploadBill;
