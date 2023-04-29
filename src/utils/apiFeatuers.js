class GetDocuments  {
    constructor(mongooseQuery,queryString){
  this.queryString=queryString
  this.mongooseQuery=mongooseQuery
  
    }
  
    paginate(){
      
      let page = this.queryString.page*1 ||1
  if (page <0) page=1
  const limit=8
  const skip=(page-1)*limit
  this.mongooseQuery.skip(skip).limit(limit)
  this.page=page
 
  return this
    }
  
    filter(){
      const queryString=this.queryString
  
  delete queryString["page"]//to delete query from the req, query to save performance
  this.mongooseQuery.find()
  return this
    }
  
    sort(){
      
      if (this.queryString.sort) {
        let sort = this.queryString.sort.split(",").join(" ")
        this.mongooseQuery.sort(sort)
        delete this.queryString["sort"]
      }
      return this
    }
  
    search(){
      if (this.queryString.keyWord) {
        let keyword = this.queryString.keyWord
       this.mongooseQuery.find({name:{$regex:keyword,$options:"i"}})
      
      }
      return this
    }
  
  selectFields(){
    if (this.queryString.fields) {
      let fieldsSelect = this.queryString.fields.split(",").join(" ")
      this.mongooseQuery.select(fieldsSelect)
    
    }
    return this
  
  }
    
  }
  module.exports = GetDocuments