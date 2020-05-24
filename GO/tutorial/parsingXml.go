package main

import (
	"encoding/xml"
	"fmt"
)

func main() {
	//response, _ := http.Get("https://www.washingtonpost.com/sitemaps/index.xml")
	//bytes, _ := ioutil.ReadAll(response.Body)

	var s SitemapIndex
	xml.Unmarshal(washPostXml, &s)

	fmt.Println(s.Locations)
}

func (l Location) String() string {
	return fmt.Sprintf(l.Loc)
}

type SitemapIndex struct {
	Locations []Location `xml:"sitemap"`
}

type Location struct {
	Loc string `xml:"loc"`
}

var washPostXml = []byte(`
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap>
<loc>
https://www.washingtonpost.com/sitemaps/business.xml
</loc>
</sitemap>
<sitemap>
<loc>
https://www.washingtonpost.com/sitemaps/entertainment.xml
</loc>
</sitemap>
<sitemap>
<loc>
https://www.washingtonpost.com/sitemaps/going-out-guide.xml
</loc>
</sitemap>
<sitemap>
<loc>
https://www.washingtonpost.com/sitemaps/lifestyle.xml
</loc>
</sitemap>
<sitemap>
<loc> https://www.washingtonpost.com/sitemaps/local.xml </loc>
</sitemap>
<sitemap>
<loc>
https://www.washingtonpost.com/sitemaps/national.xml
</loc>
</sitemap>
<sitemap>
<loc>
https://www.washingtonpost.com/sitemaps/opinions.xml
</loc>
</sitemap>
<sitemap>
<loc>
https://www.washingtonpost.com/sitemaps/politics.xml
</loc>
</sitemap>
<sitemap>
<loc> https://www.washingtonpost.com/sitemaps/sports.xml </loc>
</sitemap>
<sitemap>
<loc>
https://www.washingtonpost.com/sitemaps/technology.xml
</loc>
</sitemap>
<sitemap>
<loc> https://www.washingtonpost.com/sitemaps/world.xml </loc>
</sitemap>
<sitemap>
<loc> https://www.washingtonpost.com/sitemaps/cars.xml </loc>
</sitemap>
<sitemap>
<loc>
https://www.washingtonpost.com/sitemaps/outlook.xml
</loc>
</sitemap>
<sitemap>
<loc>
https://www.washingtonpost.com/sitemaps/photography.xml
</loc>
</sitemap>
<sitemap>
<loc>
https://www.washingtonpost.com/sitemaps/public-relations.xml
</loc>
</sitemap>
</sitemapindex>
`)
