package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Src struct {
	Url string `json:"url"`
	Format string `json:"format"`
}

type Styles struct {
	Weight string `json:"weight"`
	Style string `json:"style"`
	Src Src `json:"src"`
}

type Font struct {
	Family string `json:"family"`
	Styles Styles `json:"styles"`
}

var fonts = []Font{
	{
		Family: "Opens Sans",
		Styles: Styles{
			Weight: "100",
			Style: "normal",
			Src: Src{
				Url: "OpenSans-Light.woff2",
				Format: "woff2",
			},
		},
	},
	{
		Family: "Opens Sans",
		Styles: Styles{
			Weight: "400",
			Style: "normal",
			Src: Src{
				Url: "OpenSans-Regular.woff2",
				Format: "woff2",
			},
		},
	},
	{
		Family: "Opens Sans",
		Styles: Styles{
			Weight: "400",
			Style: "italic",
			Src: Src{
				Url: "OpenSans-Italic.woff2",
				Format: "woff2",
			},
		},
	},
}

func main() {
	router := gin.Default()
	router.GET("/fonts", getFonts)

	router.Run(":3000")
}

func getFonts(c *gin.Context) {
	family := c.Query("family")
	weights := c.Query("weights")
	styles := c.Query("styles")
	display := c.Query("display")

	c.JSON(http.StatusOK, fonts)
}

