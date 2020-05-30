import { Col, Row, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router-dom';
import { Header } from '../../components';
import { ITemplate } from '../../interfaces';
import { StoreContext } from '../../stores/context';

const DetailedTemplate: React.FC = observer(() => {
  const [template, setTemplate] = useState<ITemplate | undefined>(undefined);
  const { name } = useParams();
  const classes = useStyles();

  const { templateStore } = useContext(StoreContext);

  useEffect(() => {
    templateStore
      .load()
      .finally(() =>
        setTemplate(
          templateStore.templates.find(
            (template) => template.name.toLowerCase() === name.toLowerCase(),
          ),
        ),
      );
  }, [name, templateStore]);

  const renderContent = () => {
    if (template === undefined || typeof template.contentVariables === 'number') {
      return undefined;
    }

    return Object.keys(template.contentVariables).map((key) => {
      return (
        <Col span={24} lg={12} xl={12} xxl={6} className={classes.contentContainer} key={key}>
          <div className={classes.innerContent}>
            <Typography.Title level={4}>{key}</Typography.Title>
            <Typography.Title level={4} type={'secondary'}>
              {template.contentVariables[key].type}
            </Typography.Title>
          </div>
        </Col>
      );
    });
  };

  return (
    <>
      <Header goBackTo={'/templates'} subtitle={template ? template.templateFileName : undefined}>
        {template ? template.name : undefined}
      </Header>
      <div className={classes.titleContainer}>
        <Typography.Title level={3}>Variables</Typography.Title>
      </div>
      <Row>{renderContent()}</Row>
    </>
  );
});

/**
 * Styles
 */

const useStyles = createUseStyles({
  contentContainer: {
    padding: [16, 8, 0, 8],
  },
  innerContent: {
    background: '#FFFFFF',
    padding: 24,
  },
  editorContainer: {
    marginTop: 16,
  },
  titleContainer: {
    padding: [24, 16, 0, 16],
  },
});

export default DetailedTemplate;
