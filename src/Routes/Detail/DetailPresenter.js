import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components//Loader";
import Message from "../../Components/Message";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;

const Backdrop = styled.div`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    z-index: 1;
    height: 100%;
`;

const Cover = styled.div`
    width: 30%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    height: 100%;
    border-radius: 5px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 10px;
`;

const Title = styled.h3`
    font-size: 32px;
    margin-bottom: 10px;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
`;

const Item = styled.span`
`;

const Divider = styled.span`
    margin: 0 10px;
`;

const Overview = styled.p`
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    width: 50%;
    height: 145px;
`;

const Imdb = styled.div`
    display: inline-block;
    width: 30px;
    height: 10px;
    background-image: url(${props => props.imgPath});
    background-size: cover;
    border-radius: 4px;
    background-position: center center;
    cursor:pointer;
`;

const TabMenu = styled.div`
    width: 100%;
    height:50px;
    background-color: rgba(20, 20, 20, 0.8);
    box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
    margin-top: 20px;
`;

const List = styled.ul`
    display:flex;
`;

const TabItem = styled.li`
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: 5px solid 
        ${props => props.current ? "#3498db" : "transparent"};
    transition: border-bottom .5s ease-in-out;
    cursor: pointer;
`;

const TabContainer = styled.div`

`;

const TabContent = styled.div`
    width: 100%;
    height: 482px;
    overflow-y: auto;
    display: 
        ${props => props.current ? "block" : "none"};
`;

const Youtube = styled.iframe`
    width: 200px;
    height: 200px;
    padding: 10px;
`;

const CompanyContainer = styled.div`
    display: inline-block;
    width: 300px;
    height: 300px;
    margin-top: 10px;
`;

const CompanyLogo = styled.div`
    display: inline-block;
    width: 300px;
    height: 250px;
    background-image:url(${props => props.companyImg});
    background-repeat: no-repeat;
`;

const CompanyTitle = styled.span`

`;



const DetailPresenter = ({ result, loading, error, current, handleCurrent }) => 
    loading ? (
        <>
        <Helmet>
            <title>Loading | Nomflix</title>
        </Helmet>
        <Loader />
        </>
     ) : (
        error ? <Message /> : 
        <Container>
        <Helmet>
            <title>{result.original_title ? result.original_title : result.original_name}{" "}| Nomflix</title>
        </Helmet>
        <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
        <Content>
            <Cover bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original${result.poster_path}` : require("../../assets/noPosterSmall.png")}  />
            <Data>
                <Title>{result.original_title ? result.original_title : result.original_name}</Title>
                <ItemContainer>
                    <Item>{result.release_date ? result.release_date.substring(0,4) : result.first_air_date.substring(0,4) }</Item>    
                    <Divider>•</Divider>
                    <Item>{result.runtime ? result.runtime : result.episode_run_time[0] } min</Item> 
                    <Divider>•</Divider>
                    <Item>
                        {result.genres && 
                            result.genres.map((genre, index) => 
                                index === result.genres.length -1 
                                ? genre.name 
                                : `${genre.name} / `
                            )}
                    </Item>
                    <Divider>•</Divider>
                    <Item>
                        <Imdb imgPath={require("../../assets/imdb.png")} onClick={() => window.open(`https://imdb.com/title/${result.imdb_id}`,"_blank")}/>
                    </Item>
                </ItemContainer>
                <Overview>{result.overview}</Overview>
                <TabContainer>
                    <TabMenu>
                        <List>
                            <TabItem onClick={()=>handleCurrent("youtube")} current={current === "youtube"}>
                                    예고편
                            </TabItem>
                            <TabItem onClick={()=>handleCurrent("company")} current={current === "company"}>
                                    제작사
                            </TabItem>
                        </List>
                    </TabMenu>
                    <TabContent current={current === "youtube"}>
                        {result.videos.results && 
                            result.videos.results.length > 0 ?
                            result.videos.results.map((src) => <Youtube key={src.id} title={src.name} src={`https://www.youtube.com/embed/${src.key}`} />)
                            : <div><p>Can't find video</p></div>
                        }
                    </TabContent>
                    <TabContent current={current === "company"}>
                        
                            {result.production_companies && 
                                result.production_companies.length > 0 ?
                                result.production_companies.map((company) => company.logo_path && 
                                    <CompanyContainer key={company.id}>
                                        <CompanyLogo companyImg={`https://image.tmdb.org/t/p/w300${company.logo_path}`}/>
                                        <CompanyTitle>{company.name}({company.origin_country})</CompanyTitle>
                                    </CompanyContainer>    
                                )
                                : <div><p>Can't find video</p></div>
                            }
                    </TabContent>
                </TabContainer>
            </Data>
        </Content>
    </Container>
    );

DetailPresenter.propTypes = {
    result: PropTypes.object, 
    loading: PropTypes.bool.isRequired, 
    error: PropTypes.string
};

export default DetailPresenter;
