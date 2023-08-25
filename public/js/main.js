console.log("hello js");

var searchParams = new URLSearchParams(location.search);
console.log(searchParams.get("token"));
