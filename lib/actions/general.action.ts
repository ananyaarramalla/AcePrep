import {db} from "@/firebase/admin";

export async function getInterviewsByUserId(userID: string): Promise<Interview[] | null>{
    const interviews = await db
        .collection("interviews")
        .where("userID", '==', userID)
        .orderBy("createdAt", "desc")
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Interview[];
}

export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null>{
    const { userID, limit =20 } = params;
    const interviews = await db
        .collection("interviews")
        .orderBy("createdAt", "desc")
        .where("finalized", '==', true)
        .where('userID','!=' , userID)
        .limit(limit)
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Interview[];
}

export async function getInterviewByUserId(id: string): Promise<Interview | null>{
    const interview = await db
        .collection("interviews")
        .doc(id)
        .get();

    return interview.data() as Interview | null;
}
