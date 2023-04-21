interface TrRecord {
    origin: string;
    target: string;
    date: number;
    // extra
    objectId?: string,
    createdAt?: string,
    updatedAt?: string,
}

export default TrRecord;
