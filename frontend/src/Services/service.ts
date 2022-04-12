import http from "../http-common";
import bookItem from "../Types/bookItem";
import bookContent from "../Types/bookContent";


class DataService{

//Books.txs

    //1. 출판사/정렬기준/category/pageNum를 보내면 출판사 별 문제집을 반환 (9개의 결과)
    getWorkbook(publisher : string, sortType: string, pageNum: number, category: string){
        return http.get<bookItem[]>(`/workbook?publisher=${publisher}&sortType=${sortType}&category=${category}&pageNum=${pageNum}`);//url+/publisher
    }

    //2. 출판사/category별 문제의 총 갯수
    getWorkbookInfo(publisher: string, category: string){
        return http.get<bookItem[]>(`/workbook/info?publisher=${publisher}&category=${category}`);
    }

    //3. 문제집 리스트를 반환
    getWorkbookList(){
        return http.get<bookContent[]>("/workbook/list");
    }
}

export default new DataService();
