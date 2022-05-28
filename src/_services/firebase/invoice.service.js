import {
    doc,
    getDoc,
    collection,
    getDocs,
    addDoc,
} from 'firebase/firestore';
import patientService from './patient.service';
import {db} from './app';

const invoiceRef = collection(db, 'invoices');

const invoiceServices = {
    /**
     * @async
     * @param {*} patients
     * @returns
     */
    async getDocsAll(patients) {
        try {
            // console.log('PATIENTS: ', patients);
            const snapshot = await getDocs(invoiceRef);
            let invoices = [];
            snapshot.forEach((doc, index) => {
                invoices.push({...doc.data(), id: doc.id});
            });
            const results = invoices.map(
                async (invoice, index) => {
                    if (patients && patients.length) {
                        let tempData = patients.find(
                            patient =>
                                patient.id ===
                                invoice.patient_id,
                        );
                        //Get rid of patient_id
                        const {id, ...rest} = tempData;
                        return Object.assign(invoice, rest);
                    }
                    //In case of not fetched patient data yet
                    const dataFromDB =
                        await patientService.getDocById(
                            invoice.patient_id.toString(),
                        );

                    //Get rid of patient_id
                    const {id, ...rest} = dataFromDB;
                    return Object.assign(invoice, rest);
                },
            );
            return Promise.all(results);
        } catch (error) {
            throw error;
        }
    },
    /**
     * @async
     * @param {*} id
     * @returns
     */
    async getDocById(id) {
        try {
            const docRef = doc(invoiceRef, id);
            const result = await getDoc(docRef);
            return {...result.data(), id: result.id};
        } catch (error) {
            throw error;
        }
    },
    /**
     * @async
     * @param {*} data
     * @returns
     */
    async addInvoice(data) {
        try {
            const res = await addDoc(invoiceRef, data);
            return res;
        } catch (error) {
            throw error;
        }
    },
};

export default invoiceServices;
