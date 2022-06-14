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
    marginHorizontal: 60,
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
});
const ReceiptPDF = ({ transaction }) => {
  return (
    <Document>
      <Page style={styles.page}>
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
        </View>

        <View style={styles.footer}>
          <Text style={styles.title}>
            THIS INVOICE SHALL BE VALID FOR FIVE (5)
            <br /> YEARS FROM THE DATE OF THE PERMIT TO USE
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ReceiptPDF;
