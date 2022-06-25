import bookItem from "../Types/bookItem";
import bookContent from "../Types/bookContent";
import axios from "axios";


class DataService{

//Books.txs

    //1. 출판사를 보내면 출판사 별 문제집을 반환
    getWorkbook(publisher : string, sortType: string, pageNum: number, category: string){
        return axios.get<bookItem[]>(`/workbook?publisher=${publisher}&sortType=${sortType}&category=${category}&pageNum=${pageNum}`);//url+/publisher
    }

    //2.모든 문제집을 반환
    getWorkbookList(){
        return axios.get<bookItem[]>("/workbook");
    }

    //3. 문제집 리스트를 반환
    getAllBookContent(){
        return axios.get<bookContent[]>("");
    }
}

export default new DataService();
