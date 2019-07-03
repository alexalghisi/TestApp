import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions as ScreenDimensions,
  Image
} from "react-native";
import boundMethod from "autobind-decorator";
import Dimensions from "../constants/dimensions";
import Colors from "../constants/colors";
import { db } from "../config";

let itemsRef = db.ref("/data");

let width = ScreenDimensions.get("window").width;

const headerImageUri =
  "https://aa-boschbcs-by.resource.bosch.com/media/_tech/images/backgrounds/visual_workshopfinder.jpg";

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  // Add the mandatory key for each item
  // displayed in the FlatList.
  for (let index = 0; index < data.length; ++index) {
    data[index].key = index;
  }

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  return data;
};

class DocumentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  // Fetch data from Firebase.
  componentDidMount() {
    itemsRef.once("value", snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    });
  }

  // Render function used by FlatList.
  renderItem = ( item ) => {
    item = item.item;
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }

    return (
      <View style={styles.item}>
        <Image
          style={{ width: "100%", height: "70%" }}
          source={{ uri: item.imageURI }}
        />
        <Text style={[styles.itemText, styles.typeTextStyle]}>{item.type}</Text>
        <Text style={[styles.itemText, styles.dateTextStyle]}>
          {item.expire}
        </Text>
      </View>
    );
  };

  @boundMethod
  render() {
    const { numColumns } = this.props;
    const { items } = this.state;

    return (
      <View style={styles.viewContainer}>
        {items.length > 0 ? console.log(items) : console.log(items)}
        <Image style={styles.headerImage} source={{ uri: headerImageUri }} />
        <FlatList
          data={formatData(items, numColumns)}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
        />
      </View>
    );
  }
}

DocumentsList.defaultProps = {
  numColumns: 3
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.containerBackgroundColor
  },
  headerImage: {
    height: 80,
    width: width,
    marginBottom: Dimensions.marginBottom
  },
  viewContainer: {
    backgroundColor: Colors.containerBackgroundColor
  },
  typeTextStyle: {
    fontSize: Dimensions.primaryFontSize,
    fontWeight: "bold",
    textAlign: "center"
  },
  dateTextStyle: {
    fontSize: Dimensions.secondaryFontSize
  },
  item: {
    height: 150,
    backgroundColor: Colors.cardBackgroundColor,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    borderRadius: 3
  },
  itemInvisible: {
    backgroundColor: "transparent"
  },
  itemText: {
    color: Colors.textColor
  }
});

export default DocumentsList;
