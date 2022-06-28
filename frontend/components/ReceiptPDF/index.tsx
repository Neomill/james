import { useGetTransactionByIdQuery } from "@/redux/services/transactionsAPI";
import { numberWithCommas } from "@/utils/numberWithCommas";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import dayjs from "dayjs";

const styles = StyleSheet.create({
  page: {},
  section: {
    color: "black",
    margin: 30,
    display: "flex",
    alignItems: "center",
  },
  footer: {
    color: "black",
    marginTop: 60,
    marginHorizontal: 60,
    display: "flex",
    alignItems: "center",
  },
  receipt_item: {
    color: "black",
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  receipt_more_info: {
    color: "black",
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  receipt_item_container: {
    borderBottom: "1px",
    marginHorizontal: 60,
    marginVertical: 5,
  },
  total_container: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  logo: {
    width: 100,
    height: 100,
  },
  sign:{
    marginTop:20,
    pading:30,
    fontSize:20,
  }
});
const ReceiptPDF = ({isPO, transaction, cfname, clname, efname, elname }) => {
  return (
    <Document>
      {/* <Page style={styles.page}>
        <View style={styles.section}>
          <Image style={styles.logo } src={"/a.png"} />
          <Text style={styles.title}>James Hatchery</Text>
          <Text style={styles.title}>
            Brgy 19, Vildu Tacloban 
          </Text>
          <Text style={styles.title}>
            +6390192837465
          </Text>
          <Text style={styles.title}>Sales Invoice</Text>
          <Text style={styles.title}>
            Trans. Date:{" "}
            {dayjs(transaction?.createdAt).format("MM/DD/YYYY HH:mm:ss")}
          </Text>
          <Text style={styles.title}>{transaction?.transaction_code}</Text>
          <Text style={styles.title}> </Text>
          <Text style={styles.title}>
            Table {transaction?.invoice?.table?.name}
          </Text>
        </View>
        <View style={styles.receipt_item_container}>
          {transaction?.invoice?.orders.map((order) => (
            <View key={order.id}>
              <View style={styles.receipt_item}>
                <Text>{order.menu_item?.name}</Text>
                <Text>
                  {numberWithCommas(Number(order.price * order.qty).toFixed(2))}
                </Text>
              </View>
              <View key={order.id} style={styles.receipt_more_info}>
                <Text>{order.price}</Text>
                <Text> x {order.qty}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.total_container}>
          <View style={styles.receipt_item}>
            <Text>Total</Text>
            <Text>
              {numberWithCommas(Number(transaction?.price).toFixed(2))}
            </Text>
          </View>
          <View style={styles.receipt_item}>
            <Text>Cash</Text>
            <Text>
              {numberWithCommas(Number(transaction?.cash).toFixed(2))}
            </Text>
          </View>
          <View style={styles.receipt_item}>
            <Text>Change</Text>
            <Text>
              {numberWithCommas(Number(transaction?.change).toFixed(2))}
            </Text>
          </View>
          
          <View style={styles.sign}>
              <Text>Ordered By :{cfname} {clname}</Text>
          </View>

          <View style={styles.sign}>
              <Text></Text>
          </View>

          <View style={styles.sign}>
              <Text>Sign By :{efname} {elname}</Text>
          </View>
        </View>


        <View style={styles.footer}>
          <Text style={styles.title}>
            THIS INVOICE SHALL BE VALID FOR FIVE (5)
            <br /> YEARS FROM THE DATE OF THE PERMIT TO USE
          </Text>
        </View>
      </Page> */}
      <Page style={{
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        fontSize: "14px",
        color: "#2a2a2a"}}>
      <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
        <View>

            {(isPO) ? 
            <Text style={{ color: "navy", fontSize:"24", fontWeight: "bold" }}>
              Purchase Order Summary
            </Text> : 
            <Text style={{ color: "orange", fontSize:"24", fontWeight: "bold" }}>
              Sales Order Summary
            </Text>
            }

          <Text style={{ color: 'gray', marginTop: 2, fontSize:"10" }}>
              {"TRANSACTION"} # : {transaction?.transaction_code}
          </Text>
          
          <Text style={{ fontSize: "10px", color: "gray", marginTop: 20, fontWeight: 900 }}>
              STATUS:
          </Text>
          <View style={{ backgroundColor: '#fafafa', padding:12,}}>
            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
              <Text>
                  ORDER:
              </Text>
              <Text  style={{color: "orange"}}>
                  CONFIRMED
              </Text>
            </View>
          
            <View style={{display:"flex", marginTop: 4, flexDirection:"row", justifyContent:"space-between"}}>
              <Text>
                  PAYMENT:
              </Text>
              <Text  style={{color: "green"}}>
                  PAID
              </Text>
            </View>
          </View>
          <View style={{ fontSize:"16", color: 'black', marginTop: 7, fontWeight: 900, display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={{ fontSize: "10px", color: "gray"}}>
                ORDER DATE:
            </Text>
            <Text>
              {dayjs(transaction?.createdAt).format("MM/DD/YYYY HH:mm:ss")}
            </Text>
          </View>
          <Text style={{marginTop: 10, fontSize: "10px", color: "gray", fontWeight: 900,}}>
              SALES PERSON: 
          </Text>
          <Text style={{textAlign: "right"}}>
              {`${transaction?.employee.fname } ${transaction?.employee.lname}`}
          </Text>
        </View>
        <View>
          <Text style={{fontSize:"12", color:"orange"}}>COMPANY:</Text>
          <View style={{width: "100%" ,display:"flex", flexDirection:"row", alignItems:"center"}}>
            <View>
              <Text style={{fontSize:"18"}}>
                James Hatchery
              </Text>
              <Text style={{fontSize:"14"}}>
                {transaction?.branch?.name}
              </Text>
              <Text style={{fontSize:"12", color: "gray"}}>
              {transaction?.branch?.address}
              </Text>
            </View>
            <Image style={{width: "50px"}} src={"/a.png"} />
          </View>
          
          <Text style={{fontSize:"12",  color:"orange", marginTop:"12px"}}>CUSTOMER:</Text>
          <Text style={{fontSize: "10px", color: "gray"}}>
            NAME:
          </Text>
          <Text>
            {`${transaction?.customer.fname} ${(transaction?.customer.lname !== "N/A") ? transaction?.customer.lname : ""}`}
          </Text>
          <View style={{marginTop:"7"}}>
            <Text style={{fontSize: "10px", color: "gray", }}>
              PHONE #:
            </Text>
            {
            (transaction?.customer.phone !== "N/A") ? (
              <Text>
              {`${transaction?.customer.phone}`}
              </Text>
            ) :
            (
              <Text>
              N/A
              </Text>
            )
          }
          </View>
          <Text style={{marginTop:"7",fontSize: "10px", color: "gray"}}>
            ADDRESS:
          </Text>
          {
            (transaction?.customer.address !== "N/A") ? (
              <Text>
              {`${transaction?.customer.address}`}
              </Text>
            ) :
            (
              <Text>
              N/A
              </Text>
            )
          }
        </View>
      </View>
      
      <View style={{marginTop:10}}>
      	<View style={{padding: "10px", backgroundColor: "navy", width: "100%", display:"flex", flexDirection:"row", justifyContent: "space-between"}}>
          <Text style={{color:"white", fontWeight:"medium"}}>ID</Text>
          <Text style={{color:"white"}}>ITEM</Text>
          <Text style={{color:"white"}}>QTY</Text>
          <Text style={{color:"white"}}>PRICE</Text>
          <Text style={{color:"white"}}>TOTAL</Text>
        </View>
        <View style={{borderBottom: "2px", borderColor:"black", borderStyle: "solid"}}>
        {transaction?.invoice?.orders.map((order) => (
          <View style={{display:"flex", flexDirection:"row", justifyContent: "space-between", marginTop: "5", padding:"4"}} key={order.id}>
            <Text>{order.id}</Text>
            <Text>{order.menu_item?.name}</Text>
            <Text> x {order.qty}</Text>
            <Text>{order.price}</Text>
            <Text>
                {numberWithCommas(Number(order.price * order.qty).toFixed(2))}
            </Text>
          </View>
        ))}
        </View>
      </View>

      
      <View style={styles.total_container}>
          <View style={styles.receipt_item}>
            <Text>Total     :</Text>
            <Text>
              {numberWithCommas(Number(transaction?.price).toFixed(2))}
            </Text>
          </View>
          <View style={styles.receipt_item}>
            <Text>Cash     :</Text>
            <Text>
              {numberWithCommas(Number(transaction?.cash).toFixed(2))}
            </Text>
          </View>
          <View style={styles.receipt_item}>
            <Text>Change     :</Text>
            <Text>
              {numberWithCommas(Number(transaction?.change).toFixed(2))}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={{fontSize: "7px", color:"gray"}}>
            THIS INVOICE SHALL BE VALID FOR FIVE (5)
            <br /> YEARS FROM THE DATE OF THE PERMIT TO USE
          </Text>
        </View>
    
      <Text style={{
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
      }} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
    </Document>
  );
};

export default ReceiptPDF;
