module.exports = {
  //Generic template (we can use carousal here)
  genericCarouselButtons: async () => {
    return {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",

          elements: [
            {
              title: "1st Carousel",
              image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt5FkEjmz6zoz5G73Dz5D7UIfOaTJW8xo846NJxPXkSpbydwKp_sZEi_wRTxFuGSvb0iM&usqp=CAU",
              subtitle : "Click on the button",
            //   subtitle: "Please choose any option:",
    
              buttons: [
                {
                  type: "postback",
                  title: "Book Tickets",
                  payload: "#bookTickets#",
                },
                
              ],
            },
            //adding this
            {
                title: "2nd Carousel",
                image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRKggKpsbTLc5xtKPkHS36XOeALNdVTZRo1HXy484Rt7c28W1q_cMF4gvMn8msYrQ1WcA&usqp=CAU",
              subtitle : "Click on the button",
                // subtitle: "Please choose any option:",
      
                buttons: [
                  {
                  type: "postback",
                  title: "Ticket Status",
                  payload: "#ticketStatus#",
                }
                            
                ],
              },
              {
                title: "3rd Carousel",
                image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPoLFk8ZEknEsFRhOxeKE4pEsk32byIf4bRfVBuTss6BoorWwzTHG-378I8_cDN9qYBK8&usqp=CAU",
              subtitle : "Click on the button",
                // subtitle: "Please choose any option:",
      
                buttons: [
                  // {
                  //       type: "web_url",
                  //       url: "https://portal.azure.com/#home",
                  //       payload: "Visit Webste",
                  //     },
                  {
                  type: "postback",
                  title: "Cancel Ticket",
                  payload: "#cancelTicket#",
                },
                            
                ],
              },
              {
                title: "4rd Carousel",
                image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl9YDZeB-UwOb6rylLywfu8UqECK4f6IDmwvl1Z4ml&s",
              subtitle : "Click on the button",
                // subtitle: "Please choose any option:",
      
                buttons: [
                  {
                  type: "web_url",
                  url: "https://portal.azure.com/#home",
                  title: "Visit Webste",
                },
                            
                ],
              },

          ],
        },
      },
    };
    
  },
}