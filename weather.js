
function displayWeather(data)
{
    var v=data[0];
    var type=v["Type"];
    var key=v["Key"];
    var state=v["AdministrativeArea"]["LocalizedName"];
    var country=v["Country"]["LocalizedName"];
    console.log(key);
    var wUrl=`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=${"6mxMLTlGkOiMiRKwMwkfG2LSrun3KI3G"}`;
    function weatherByCityKey(wea_data)
    {
        var date=wea_data["DailyForecasts"][0]["Date"];
        var tem_min=wea_data["DailyForecasts"][0]["Temperature"]["Minimum"]["Value"].toString()+wea_data["DailyForecasts"][0]["Temperature"]["Minimum"]["Unit"];
        console.log(tem_min);
        var tem_max=wea_data["DailyForecasts"][0]["Temperature"]["Maximum"]["Value"].toString()+wea_data["DailyForecasts"][0]["Temperature"]["Maximum"]["Unit"];
        console.log(tem_max);
        var dt_has_preci=wea_data["DailyForecasts"][0]["Day"]["HasPrecipitation"];
        var dt_prec_type=wea_data["DailyForecasts"][0]["Day"]["PrecipitationType"];
        var dt_prec_inten=wea_data["DailyForecasts"][0]["Day"]["PrecipitationIntensity"];
        var nt_has_preci=wea_data["DailyForecasts"][0]["Night"]["HasPrecipitation"];
        var nt_prec_type=wea_data["DailyForecasts"][0]["Night"]["PrecipitationType"];
        var nt_prec_inten=wea_data["DailyForecasts"][0]["Night"]["PrecipitationIntensity"];
        console.log(nt_has_preci);
        console.log(nt_prec_inten);
        console.log(nt_prec_type);
        console.log(dt_has_preci);
        console.log(dt_prec_type);
        console.log(dt_prec_inten);
        var wea_link=wea_data["DailyForecasts"][0]["Link"];
        console.log(wea_link);
        var condition=wea_data["Headline"]["Text"];
        var wea_type=wea_data["Headline"]["Category"];
        console.log(wea_type);
        console.log(condition);
        var t=wea_link.slice(33);
        console.log(t);
        var city_name="";
        for(var i=0;i<t.length;i++)
        {
            if(t[i]!="/")
            {
                city_name=city_name+t[i];
            }
            else{
                break;
            }
        }
        console.log(city_name);
        var card=`<div class="card" style="width:400px; margin-top:20px; border-radius:10px;">
<center><img src="weatherpic.png" class="card-img-top" alt="..."  style="margin-top:20px;width:360px;height:170px; border-radius:8px;"></center>
<div class="card-body">
<center><h5 class="card-title">${city_name}</h5></center>
<pre class="card-text">
    <b>Date :</b> ${date}
    <b>${city_name} condition :</b>  
    ${condition}
    <b>Weather catogory : </b> ${wea_type}
    <b>Minimum Temperature : </b> ${tem_min}
    <b>Maximum temperature :</b>  ${tem_max}
    <b>Day time : </b>
    <b>Has precipitation ?:</b>  ${dt_has_preci}
    <b>Precipitation type : </b> ${dt_prec_type}
    <b>Precipitation intensity :</b>  ${dt_prec_inten}
    <b>Night time : </b>
    <b>Has precipitation ?:</b>  ${nt_has_preci}</pre>
<center><a href="${wea_link}" class="btn btn-primary">See complete statistics</a></center>
</div>
</div>`
document.querySelector(".disp").innerHTML=card;



        
    }
    
    fetch(wUrl).then(wUrl=>wUrl.json()).then(wUrl=>{weatherByCityKey(wUrl)});

}
function search()
{
    var api="6mxMLTlGkOiMiRKwMwkfG2LSrun3KI3G";
    var city=document.getElementById("sear").value;
    
    var url=`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${api}&q=${city}`;
    fetch(url).then(res=>res.json()).then(res=>{displayWeather(res);});
    
}
