import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { getTestDetailList } from "../../../../../../../apis/appointment";
import styles from "./index.module.css";

//TestCode에 해당하는 testDetail 컴포넌트
function TestList(props) {
  const {testCode} = props;
  const [testDetailList,setTestDetailList] = useState([]);

  //부모 컴포넌트에서 넘겨준 TestCode 에 맞는 testdetail 리스트 가져오기
  useEffect(() => {
    (async function() {
      try{
        const response = await getTestDetailList(testCode);
        setTestDetailList(response.data);
      } catch(error){
        throw error;
      }
    })();
  },[props])
  return(
      
      <Accordion >
        <div >
          {testDetailList ? 
            testDetailList.map((item,index) => {
              if(index === 0){
                return(
                    <Accordion.Toggle className={`btn ${styles.toggle}`} eventKey="0" key={index}>
                      <div className={`d-flex ${styles.tr}`}> 
                        <div>{item.test_code}</div>
                        <div>{item.test_name}</div>
                        <div>{item.test_details_code}</div>
                        <div>{item.test_details_name}</div>
                      </div>
                        
                    </Accordion.Toggle>
                  );
              } else {
                  return(
                    <Accordion.Collapse eventKey="0" key={index}>
                      <div className={` d-flex ${styles.row} ${styles.tr}`}> 
                        <div></div>
                        <div></div>
                        <div>{item.test_details_code}</div>
                        <div>{item.test_details_name}</div>
                      </div>
                  </Accordion.Collapse>
                  );
              }
              
            })
            :
            null
        }
                 
        </div>   
      </Accordion>
  );
}
export default TestList;