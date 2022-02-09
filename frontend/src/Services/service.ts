import http from "../http-common";
import bookItem from "../Types/bookItem";
import bookContent from "../Types/bookContent";


class DataService{

//Books.txs

    //1. 출판사를 보내면 출판사 별 문제집을 반환
    getWorkbookByPb(publisher : string){
        return http.get<bookItem[]>(`/workbook?publisher=${publisher}`);//url+/publisher
    }

    //2.모든 문제집을 반환
    getAllWorkbook(){
        return http.get<bookItem[]>("/workbook");
    }

    //3. 문제집 리스트를 반환
    getAllBookContent(){
        return http.get<bookContent[]>("");
    }
}

export default new DataService();
