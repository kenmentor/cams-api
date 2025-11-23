module.exports = {
  query(sql, params = []) {
    console.log("\n SQL QUERY EXECUTED:");
    console.log("   " + sql);
    if (params.length > 0) console.log("   Params:", params);
    console.log("------------------------------------------------\n");
  },
};
