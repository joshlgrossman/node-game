module.exports = {

  port: 8000,

  on: {
    start: function(){
      console.log(`Server started on port ${module.exports.port}`);
    }
  }

};
