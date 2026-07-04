function StatCard({title,value,icon,color}){

return(

  <div className="stat-card">
    <div className="card-icon"style={{background:color}}>

    {icon}
    </div>

    <h5>{title}</h5>

    <h2>{value}</h2>

    </div>
)
}

export default StatCard;