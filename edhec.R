## require(devtools); install_github('r_jfreels','jfreels')
require(jfreels)
require(PerformanceAnalytics)

data(edhec)
e<-data.table(melt(data.frame(date=index(edhec),coredata(edhec)),id.vars='date'))
e<-dt.dates.filter(e)
e$classifi<-gsub('[.]',' ',e$classifi)
e_table<-e[,list('pratica'=aror(value),
                 'audi521'=asd(value),
                 'inialcoo'=cror(value),
                 'pibpercapita'=sharpe(value)
                 ),by=list(classifi)]
json(e_table,sink='data.json')
