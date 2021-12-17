
const Cart = (props) => {
  const [list, getList] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/cart", {
        params: {
          uid: user.uid,
        },
      })
      .then((list) => {
        getList(list);
      })
      .catch((error) => {
        console.error("Cannot retrieve user information", error);
      });
  }, []);

  if (list.length === 0) {
    return null;
  } else {
    return (
      <div>
        <>
        <Accordion defaultActiveKey="0">
        <Accordion.Item  className="bg-black text-white" eventKey="0">
        <Accordion.Header className="bg-black text-white" >Airports</Accordion.Header>
        <Accordion.Body className="bg-black text-white" >
        {list.data
          .filter((loc) => loc.types.includes("airport"))
          .map((location) => (
            <div key={location.code}>
              <div className="trip-title">{`${location.name} (${location.code})`}</div>
              <div>{`${location.city}, ${location.country}`}</div>
              <div>
                <RemoveCard cartItem={location} getList={getList} updateCart={props.updateCart}/>
              </div>
              <hr/>
            </div>
          ))}
          </Accordion.Body>
          </Accordion.Item>
          </Accordion>
          </>
          <>
        <Accordion defaultActiveKey="0">
        <Accordion.Item  className="bg-black text-white" eventKey="0">
        <Accordion.Header className="bg-black text-white" >Car Rentals</Accordion.Header>
        <Accordion.Body className="bg-black text-white" >
        {list.data
          .filter((loc) => loc.types.includes("car_rental"))
          .map((location) => (
            <div key={location.place_id}>
              <img src={location.photo} className="card-photo-title"/>
              <div className="trip-title">{location.name}</div>
              <div>{location.formatted_address}</div>
              <div>{`${location.details.rating} of 5`}</div>
              <div>{location.details.international_phone_number}</div>
              <a href={location.details.website}>Website</a>
              <div>
                <RemoveCard cartItem={location} getList={getList} updateCart={props.updateCart}/>
              </div>
              <hr/>
            </div>
          ))}
          </Accordion.Body>
          </Accordion.Item>
          </Accordion>
          </>
          <>
        <Accordion defaultActiveKey="0">
        <Accordion.Item  className="bg-black text-white" eventKey="0">
        <Accordion.Header className="bg-black text-white" >Restaurants</Accordion.Header>
        <Accordion.Body className="bg-black text-white" >
        {list.data
          .filter((loc) => loc.types.includes("restaurant"))
          .map((location) => (
            <div key={location.place_id}>
              <img src={location.photo} className="card-photo-title"/>
              <div className="trip-title">{location.name}</div>
              <div>{location.formatted_address}</div>
              <div>{`${location.details.rating} of 5`}</div>
              <div>{location.details.international_phone_number}</div>
              <a href={location.details.website}>Website</a>
              <div>
                <RemoveCard cartItem={location} getList={getList} updateCart={props.updateCart}/>
              </div>
              <hr/>
            </div>
          ))}
          </Accordion.Body>
          </Accordion.Item>
          </Accordion>
          </>
          <>
        <Accordion defaultActiveKey="0">
        <Accordion.Item  className="bg-black text-white" eventKey="0">
        <Accordion.Header className="bg-black text-white" >Interesting Places</Accordion.Header>
        <Accordion.Body className="bg-black text-white" >
        {list.data
          .filter(
            (loc) =>
              !loc.types.includes("car_rental") &&
              !loc.types.includes("restaurant") &&
              !loc.types.includes("airport")
          )
          .map((location) => (
            <div key={location.place_id}>
              <img src={location.photo} className="card-photo-title"/>
              <div className="trip-title">{location.name}</div>
              <div>{location.formatted_address}</div>
              <div>{`${location.details.rating} of 5`}</div>
              <div>{location.details.international_phone_number}</div>
              <a href={location.details.website}>Website</a>
              <div>
                <RemoveCard cartItem={location} getList={getList} updateCart={props.updateCart}/>
              </div>
              <hr/>
            </div>
          ))}
          </Accordion.Body>
          </Accordion.Item>
          </Accordion>
          </>

      </div>
    );
  }
};

export default Cart;
