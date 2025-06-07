export const mapToExtrafields = (data:any) => {
    const groupedArray = data.reduce((acc:any, currentValue:any) => {
      const key = currentValue.group;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(currentValue);
      return acc;
    }, {});
    const result = Object.keys(groupedArray).map((key) => {
      let newData : any = [];
      for (const [key2, value2] of Object.entries(groupedArray[key])) {
        if (value2 != null) {
          let newItem : any = [];
          for (const [key3, value3] of Object.entries(value2)) {
            if (value3 !== null && key3 != "id" && key3 != "group") {
            // if (value3 !== null && key3 != "group") {
              newItem[key3] = (key3=="default" && value3==null) ? "" : value3;
            }
          }
          newData[key2] = Object.assign({},newItem);
        }
      }
      return {
        items: newData,
        label: key,
        type: "group",
      };
    });
    return result;
  };
