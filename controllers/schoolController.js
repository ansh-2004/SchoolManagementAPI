import {db} from '../db.js'

export const addSchool = (req,res)=>{
    const {name,address,latitude,longitude} = req.body 

    if(!name || !address || latitude == undefined || longitude == undefined){
        return res.status(400).json({
            message : "Please fill all the fields"
        })
    }

    if(isNaN(latitude) || isNaN(longitude)){
        return res.status(400).json({
            message :"Latitude and longitude must be numbers"
        })
    }

    if(latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180){
        return res.status(400).json({
            message : "Latitude and longitude out of range"
        })
    }
    const query = "INSERT INTO schools (name,address,latitude,longitude) VALUES (? , ? , ? ,?)"

    db.query(query,[name,address,latitude,longitude],(err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).json({
                message : "Error in adding School"
            })
        }
    })

    return res.status(201).json({
        message : "School added successfully"
    })
}

const calculateDistance = (lat1,lon1,lat2,lon2)=>{
    // Haversine Formula :  calculates distance between two coordinates on Earth. Returns distance in Km 
    const R = 6371

    // difference between latitudes
    const dlat = (lat2 - lat1) * (Math.PI / 180)
    // difference between longitudes
    const dlon = (lon2 - lon1) * (Math.PI / 180)

    // Haversine formula calculation
    const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) 
              + Math.cos(lat1 * (Math.PI / 180)) 
              * Math.cos(lat2 * (Math.PI / 180)) 
              * Math.sin(dlon / 2) 
              * Math.sin(dlon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1 - a))

    // final distance in KM
    return R * c

}

export const listSchools = (req,res)=>{
    const {latitude,longitude} = req.query

    if(!latitude || !longitude){
        return res.status(400).json({
            message : "Latitude and longitude are required"
        })
    }

    const query = "SELECT * FROM schools"

    db.query(query,(err,schools)=>{
        if(err){
            return res.status(500).json({
                message : "Error fetching schools"
            })
        }

        const userlat = parseFloat(latitude)
        const userlon = parseFloat(longitude)

        const schoolsDistance = schools.map((school)=>{
            const dist = calculateDistance(userlat,userlon,school.latitude,school.longitude)
            return {...school,dist}
        })

        schoolsDistance.sort((a,b)=>a.distance - b.distance)

        return res.status(200).json(schoolsDistance)

    })

    


}