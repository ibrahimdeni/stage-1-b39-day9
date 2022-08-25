
const express = require('express')

const app = express()
const port = 8000

app.set('view engine', 'hbs')//set view engine hbs
app.use('/assets', express.static(__dirname + '/assets'))//biar bisa baca path folder assets
app.use(express.urlencoded({extended: false}))

const db = require('./connection/db')

let isLogin = false

app.get('/home', function(request,response){
    // console.log(dataProject);

    // let data = dataProject.map(function(isi){
    //     return {
    //         ...isi,
    //         isLogin,
    //         duration: getDistanceTime(new Date(isi.sDate), new Date(isi.eDate))
    //     }
    // })

    db.connect(function(err, client, done){
        if (err) throw err //untuk menampilkan error koneksi antara database dan nodejs

        client.query('SELECT * FROM tb_projects;', function(err, result){
            if (err) throw err //untuk menampilkan error dari query database

            console.log(result.rows);
            let data = result.rows

            let dataP = data.map(function(isi){
                return {
                    ...isi,
                    duration: getDistanceTime(new Date(isi.start_date), new Date(isi.end_date))
                }
            })

            response.render("home", {isLogin, dataProject: dataP})
        })

    })

})

app.get('/project-detail/:index', function(request,response){

    // let index = request.params.index

    // let data = dataProject[index]
    // data = {
    //     project: data.project,
    //     sDate: data.sDate,
    //     eDate: data.eDate,
    //     duration: getDistanceTime (new Date(data.sDate), new Date(data.eDate)),
    //     Descr: data.Descr
    //     }

    // // console.log(id);

    response.render("project-detail")
})

//untuk menampilkan halaman
app.get('/add-project', function(request,response){ 
    response.render("add-project")
})

// untuk mengambil data dari add-project
app.post('/add-project', function(request,response){
    // // console.log(request.body);
    // let project = request.body.inputProject
    // let sDate = request.body.inputStartDate
    // let eDate = request.body.inputEndDate
    // let Descr = request.body.inputDescription
    // let nodeJs = request.body.inputNOJ
    // let reactJs = request.body.inputREJ
    // let nextJs = request.body.inputNEJ
    // let java = request.body.inputJAV
    // let image = request.body.inputImage

    // // if (nodeJs){
    // //     nodeJs = request.body.inputNOJ.value
    // // } else {
    // //     nodeJs = ""
    // // }


    // // console.log(project);
    // // console.log(sDate);
    // // console.log(eDate);
    // // console.log(Descr);
    // // console.log(nodeJs);
    // // console.log(reactJs);
    // // console.log(nextJs);
    // // console.log(java);

    // let input = {
    //     project,
    //     sDate,
    //     eDate,
    //     Descr,
    //     nodeJs,
    //     reactJs,
    //     nextJs,
    //     java,
    //     image
    // }

    // dataProject.push(input)

    // response.redirect("/home")
})

//get ke hal edit blog untuk input data baru
app.get('/edit-project/:index', function(request,response){ 
    // let index = request.params.index
    
    // let edit = {
    //     project : dataProject[index].project,
    //     sDate : dataProject[index].sDate,
    //     eDate : dataProject[index].eDate,
    //     Descr : dataProject[index].Descr,
    //     nodeJs : dataProject[index].nodeJs,
    //     reactJs :dataProject[index].reactJs,
    //     nextJs : dataProject[index].nextJs,
    //     java : dataProject[index].java,
    //     image : dataProject[index].image
    // }

    // response.render("edit-project", {index, edit})
})

//untuk post hasil edit ke hal home
app.post('/edit-project/:index', function(request,response){ 

    // let index = request.params.index

    // dataProject[index].project = request.body.inputProject
    // dataProject[index].sDate = request.body.inputStartDate
    // dataProject[index].eDate = request.body.inputEndDate
    // dataProject[index].Descr = request.body.inputDescription
    // dataProject[index].nodeJs = request.body.inputNOJ
    // dataProject[index].reactJs = request.body.inputREJ
    // dataProject[index].nextJs = request.body.inputNEJ
    // dataProject[index].java = request.body.inputJAV
    // dataProject[index].image = request.body.inputImage

    // response.redirect("/home")
})

//untuk hapus project
app.get('/delete-project/:index', function(request, response) {
    // // console.log(request.params);
    // let index = request.params.index
    // console.log(index);

    // dataProject.splice(index, 1)

    // response.redirect('/home')
})

function getDistanceTime(startd, endd){
    let mulai = new Date(startd)
    let akhir = new Date(endd)

    let duration = akhir - mulai
    
    //miliseconds  1000 = 1 detik
    //second in hours 3600 
    // hours in day 23 (karena ketika sudah sampai jam 23.59 akan kembali ke 00.00)
    // day in month 31

    let distanceDay = Math.floor(duration / (1000 * 3600 * 23));
    let distanceMonth = Math.floor(distanceDay / 31);

    
    if (distanceMonth <= 0) {
        return distanceDay + " Hari"
    } else 
        return distanceMonth + " Bulan "
    
}

app.get('/contact', function(request,response){
    response.render("contact")
})


app.listen(port, function(){
    console.log(`server running on port ${port}`);
} 
)