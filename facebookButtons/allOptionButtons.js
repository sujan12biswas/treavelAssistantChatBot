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
              title: "Please choose any option:",
            //   subtitle: "Please choose any option:",
    
              buttons: [
                {
                  type: "postback",
                  title: "Book Tickets",
                  payload: "#bookTickets#",
                },
                {
                  type: "postback",
                  title: "Ticket Status",
                  payload: "#ticketStatus#",
                },
                {
                  type: "postback",
                  title: "Cancel Ticket",
                  payload: "#cancelTicket#",
                },
                
              ],
            },
            //adding this
            {
                title: "Please choose any option:",
                // subtitle: "Please choose any option:",
      
                buttons: [
                  {
                                type: 'postback',
                                title: 'Travel Destination Enquery',
                                payload: '#travelDestinationEnquery#'
                            },
                            // {
                            //     type: 'postback',
                            //     title: 'Weather Status',
                            //     payload: '#weatherStatus#'
                            // },
                            {
                                type: 'postback',
                                title: 'More Carousel',
                                payload: '#moreCarousel#'
                            }
                  
                ],
              },

          ],
        },
      },
    };
    
  },
  
  //If we use buttons as template

  //     allOptionButtons2 : async()=>{
  //         return {
            //   attachment: {
            //       type: 'template',
            //       payload: {
            //           template_type: 'button',
            //           text: 'Choose an option:',
            //           buttons: [
            //               {
            //                   type: 'postback',
            //                   title: 'Travel Destination Enquery',
            //                   payload: 'travelDestinationEnquery'
            //               },
            //               {
            //                   type: 'postback',
            //                   title: 'Weather Status',
            //                   payload: 'weatherStatus'
            //               }
            //           ]
            //       }

            //  }
            // }

      // }
  }
