import http from "../http-common";
import bookItem from "../Types/DataTypes";


class DataService{

//Books.txs

    //1. 출판사를 보내면 출판사 별 문제집을 반환
    getWorkbookByPb(publisher : string){
        return http.get<bookItem[]>(`/${publisher}`);//url+/publisher
    }

    getWorkbook(){
        return http.get<bookItem[]>("/workbook");
    }
}

export default new DataService();
