
function displayWeather(data)
{
    var apik="iSPPckgGAEYYM3h4ze337gpKysKeygOk";
    var v=data[0];
    var city_name=v["LocalizedName"];
    //var type=v["Type"];
    //console.log(type);//city
    var key=v["Key"];
    var state=v["AdministrativeArea"]["LocalizedName"];
    var country=v["Country"]["LocalizedName"];
    console.log(v);
    var wUrl=`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=${apik}`;
    function weatherByCityKey(wea_data)
    {
        var date=wea_data["DailyForecasts"][0]["Date"].slice(0,10);
        var tem_min=wea_data["DailyForecasts"][0]["Temperature"]["Minimum"]["Value"].toString()+wea_data["DailyForecasts"][0]["Temperature"]["Minimum"]["Unit"];
        console.log(tem_min);
        var tem_max=wea_data["DailyForecasts"][0]["Temperature"]["Maximum"]["Value"].toString()+wea_data["DailyForecasts"][0]["Temperature"]["Maximum"]["Unit"];
        var dt_has_preci=wea_data["DailyForecasts"][0]["Day"]["HasPrecipitation"];
        var dt_prec_type=wea_data["DailyForecasts"][0]["Day"]["PrecipitationType"];
       // var dt_prec_inten=wea_data["DailyForecasts"][0]["Day"]["PrecipitationIntensity"];
        var nt_has_preci=wea_data["DailyForecasts"][0]["Night"]["HasPrecipitation"];
        //var nt_prec_type=wea_data["DailyForecasts"][0]["Night"]["PrecipitationType"];
       // var nt_prec_inten=wea_data["DailyForecasts"][0]["Night"]["PrecipitationIntensity"];
        console.log(nt_has_preci);
        console.log(dt_has_preci);
        console.log(dt_prec_type);
        var wea_link=wea_data["DailyForecasts"][0]["Link"];
        var condition=wea_data["Headline"]["Text"];
        var wea_type=wea_data["Headline"]["Category"];
        var card=`<div class="card">
<center><img src="clear.jpg" class="card-img-top" id="img" alt="..." ></center>
<div class="card-body">
<center><h5 class="card-title">${city_name}</h5></center>
<pre class="card-text">
<b>Date :</b> ${date}
<b>${city_name} condition :</b>  
    ${condition}
<b>Weather catogory : </b> ${wea_type}
<b>Minimum Temperature : </b> ${tem_min}
<b>Maximum temperature :</b>  ${tem_max}
<b>State : </b>${state}
<b>Country : </b>${country}
<b>Day time : </b>
<b> Has precipitation ?:</b>  ${dt_has_preci}
<b>Night time : </b>
<b> Has precipitation ?:</b>  ${nt_has_preci}</pre>
<center><a href="${wea_link}" class="btn btn-primary">See complete statistics</a></center>
</div>
</div>`
        document.querySelector(".disp").innerHTML=card;
        const x=document.querySelector("#img");
        if(wea_type=="rain")
        {
            x.src="images/rain.jpg";
        }
        else if(wea_type=="thunderstorm")
        {
            x.src="images/thunderstorm.jpg";
        }
        else if(wea_type=="clear")
        {
            x.src="images/clear.png";
        }
        else if(wea_type=="clouds")
        {
            x.src="images/clouds.jpg";
        }
        else if(wea_type=="drizzle")
        {
            x.src="images/drizzle.png";
        }
        else if(wea_type=="heat")
        {
            x.src="images/heat.png";
        }

    }
    
    fetch(wUrl).then(wUrl=>wUrl.json()).then(wUrl=>{weatherByCityKey(wUrl)});
}
function search()
{
    var api="iSPPckgGAEYYM3h4ze337gpKysKeygOk";
    var city=document.getElementById("sear").value;
    
    var url=`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${api}&q=${city}`;
    fetch(url).then(res=>res.json()).then(res=>{displayWeather(res);});
    
}
