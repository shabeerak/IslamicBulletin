# IslamicBulletin

## Create config files for every day with name `config_<fullyear>_<singledigitmonth>_<singledigitday>`
ex: config_2020_4_3.js

#### Sample Config file

```var programs = {
  video1: {
    name     : 'DRONE PROGRAM',
    link     : 'https://www.youtube.com/embed/EfYHWJeboYE?autoplay=1&mute=1',
    utcTime  : '20:29:37', //GMT time
    duration : 2 //duration in minutes
  },
  video2: {
    name     : 'ANIMAL PROGRAM',
    link     : 'https://www.youtube.com/embed/ObRNOG4pPFw?autoplay=1&mute=1',
    utcTime  : '21:32:31', //GMT time
    duration : 1 //duration in minutes
  }
};

var dailyDefault = {
    name     : 'Zoom Link',
    link     : 'https://zoom.us/rec/share/95FzaJLV6HpIfpGW-nrncOkuIIb5eaa82ygbq6JcnkmnVG-FxTlDS2T89so4A6ov?startTime=1585801084000'
}; 
```

### Config name
```
'config_' + new Date().getUTCFullYear() + '_' + new Date().getUTCMonth() + '_' + new Date().getUTCDate() + '.js'
```

### Date in UTC
```
new Date().toUTCString()
```

### UTC to timestamp
```
Date.parse(new Date().toUTCString())
```

### Timestamp back to UTC
```
new Date(1588539798000).toUTCString()
```
